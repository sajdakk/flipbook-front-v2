import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import type { UploadFile, UploadProps } from 'antd';
import { readFile } from '../utils/read_file';
import { styled } from 'styled-components';
import { API } from '../utils/api';
import { User } from '../types';

const UploadWrapper = styled.div`
	.ant-upload-wrapper {
		width: min-content;
	}
`;

interface Props {
	initialValue: string | null;
	user: User;
	onChange: () => void;
}

export const AvatarInput: React.FC<Props> = ({ initialValue, user, onChange }) => {
	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewImage, setPreviewImage] = useState('');
	const [fileList, setFileList] = useState<UploadFile[]>([]);

	useEffect(() => {
		if (!initialValue || initialValue.length === 0) {
			return;
		}

		setFileList([{ uid: '-1', name: 'avatar', status: 'done', url: `${process.env['API']}/uploads/${initialValue}` }]);
	}, [initialValue]);

	const handleCancel = () => setPreviewOpen(false);

	const handlePreview = async (file: UploadFile) => {
		if (!file.url && !file.preview) {
			file.preview = await readFile(file.originFileObj as File);
		}

		setPreviewImage(file.url || (file.preview as string));
		setPreviewOpen(true);
	};

	const handleChange: UploadProps['onChange'] = (info: any) => {
		const newFileList = info.fileList;
		if (info.file.status !== 'done') {
			setFileList(newFileList);
		}

		if (info.file.status === 'done' || info.file.status === 'removed') {
			onChange();
		}
	};

	const uploadButton = (
		<button style={{ border: 0, background: 'none' }} type="button">
			<PlusOutlined />
			<div style={{ marginTop: 8 }}>Upload</div>
		</button>
	);

	return (
		<>
			<UploadWrapper>
				<Upload
					action={process.env['API'] + `/users/${user.id}/avatar`}
					listType="picture-circle"
					multiple={false}
					fileList={fileList}
					onPreview={handlePreview}
					onChange={handleChange}
					accept="image/*"
					method="POST"
					onRemove={() => {
						API().user(user.id).avatar.delete();
						onChange();
					}}
					withCredentials
				>
					{fileList.length > 0 ? null : uploadButton}
				</Upload>
			</UploadWrapper>

			<Modal open={previewOpen} okButtonProps={{ style: { display: 'none' } }} onCancel={handleCancel}>
				<img alt="avatar" style={{ width: '100%' }} src={previewImage} />
			</Modal>
		</>
	);
};
