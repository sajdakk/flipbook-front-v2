import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import { readFile } from '../utils/read_file';
import { styled } from 'styled-components';


const UploadWrapper = styled.div`
	.ant-upload-wrapper {
		width: min-content;
	}
`;

interface Props {
	initialValue: String | null;
}



export const AvatarInput: React.FC<Props> = ({ initialValue }: Props) => {
	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewImage, setPreviewImage] = useState('');
	const [fileList, setFileList] = useState<UploadFile[]>([]);

	useEffect(() => {
		if (initialValue) {
			setFileList([{ uid: '-1', name: 'image.png', status: 'done', preview: `data:image/png;base64,${initialValue}` }]);
		}
	}, [initialValue]);

	const handleCancel = () => setPreviewOpen(false);

	const handlePreview = async (file: UploadFile) => {
		if (!file.url && !file.preview) {
			file.preview = await readFile(file.originFileObj as File);
		}

		setPreviewImage(file.url || (file.preview as string));
		setPreviewOpen(true);
	};

	const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => setFileList(newFileList);

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
				action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
				listType="picture-circle"
				multiple={false}
				fileList={fileList}
				onPreview={handlePreview}
				onChange={handleChange}
				accept="image/*"
			>
				{fileList.length > 0 ? null : uploadButton}
			</Upload>
		</UploadWrapper>

			<Modal open={previewOpen} okButtonProps={{ style: { display: 'none' } }} onCancel={handleCancel}>
				<img alt="example" style={{ width: '100%' }} src={previewImage} />
			</Modal>
		</>
	);
};
