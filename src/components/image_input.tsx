import React, { useEffect, useState } from 'react';
import { Upload } from 'antd';
import { FileImageOutlined, LoadingOutlined } from '@ant-design/icons';
import { styled } from 'styled-components';
import { blue } from '@ant-design/colors';
import { readFile } from '../utils/read_file';

const Dragger = styled(Upload.Dragger)`
	border-radius: 4px !important;
	overflow: hidden;

	&.filled {
		display: flex;
		flex-direction: column;
		justify-content: stretch;
		align-items: stretch;

		span.ant-upload {
			padding: 0;
			display: block;
			box-sizing: border-box;

			> .ant-upload-drag-container {
				display: flex;
				justify-content: center;
				align-items: stretch;
				height: 100%;
				max-height: 200px;
			}
		}
	}
`;

const Preview = styled.img`
	display: block;
	object-fit: contain;
`;

const Loading = styled(LoadingOutlined)`
	color: ${blue[5]};
	font-size: 48px;
`;

interface Props {
	value: File | null;
	onChange: (file: File) => void;
}

export const ImageInput: React.FC<Props> = ({ value, onChange }: Props) => {
	const [loading, setLoading] = useState<boolean>(false);
	const [preview, setPreview] = useState<string | null>(null);

	useEffect(() => {
		const fetch = async () => {
			if (!value) {
				setPreview(null);
				setLoading(false);
				return;
			}

			setLoading(true);

			const src = await readFile(value);
			setPreview(src);

			setLoading(false);
		};

		fetch();
	}, [value]);

	const buildPreview = () => {
		if (loading) {
			return <Loading spin />;
		}

		if (preview) {
			return <Preview src={preview} alt="cover" />;
		}

		return (
			<>
				<p className="ant-upload-drag-icon">
					<FileImageOutlined />
				</p>
				<p className="ant-upload-text">Click or drag file to this area to upload</p>
				<p className="ant-upload-hint">
					{' '}
					Support for a single upload. Strictly prohibited from uploading company data or other banned files.
				</p>
			</>
		);
	};

	return (
		<Dragger
			className={preview ? 'filled' : ''}
			multiple={false}
			beforeUpload={(file) => {
				onChange(file);

				return false;
			}}
			showUploadList={false}
			accept="image/*"
		>
			{buildPreview()}
		</Dragger>
	);
};
