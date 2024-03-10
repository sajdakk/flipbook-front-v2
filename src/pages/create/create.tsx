import React, { useState } from 'react';
import styled from 'styled-components';
import { Header } from '../../components/header';
import { BookCard } from '../../components/book-card';
import {
	Button,
	DatePicker,
	DatePickerProps,
	Dropdown,
	Form,
	Input,
	InputNumber,
	MenuProps,
	Select,
	Space,
	Upload,
	UploadProps,
	message,
} from 'antd';
import { DownOutlined, InboxOutlined, UserOutlined } from '@ant-design/icons';
import { DefaultOptionType, SelectProps } from 'antd/es/select';
import TextArea from 'antd/es/input/TextArea';
import { colors } from '../../styles/colors';
import { ImageInput } from '../../components/image_input';
import { OutlinedButton } from '../../components/outlined-button';
import { AscentButton } from '../../components';

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: stretch;
	justify-content: stretch;
	width: 100%;
	max-width: 600px;
	padding-bottom: 24px;

	box-sizing: border-box;

	.header {
		color: #000;
		font-size: 24px;
		padding-bottom: 24px;
		align-items: center;
		padding-top: 24px;
		align-self: center;
	}

	@media screen and (max-width: 760px) {
		padding-left: 24px;
		padding-right: 24px;
	}
`;

const CreateBookForm = styled.form`
	align-self: stretch;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	gap: 24px;
	display: flex;

	@media screen and (max-width: 760px) {
		padding-top: 24px;
	}
`;

const CreateAuthorForm = styled.form`
	align-self: stretch;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	gap: 16px;
	display: flex;
	width: 100%;

	> :first-child {
		flex: 1;
		align-self: stretch;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		gap: 16px;
		display: flex;
		width: 100%;
	}
`;

export const Create: React.FC = () => {
	const [selectedLanguageIds, setSelectedLanguageIds] = useState<number[]>([]);
	const [selectedGenreIds, setSelectedGenreIds] = useState<number[]>([]);
	const [cover, setCover] = useState<File | null>(null);

	const items: DefaultOptionType['items'] = [
		{
			label: '1st menu item',
			value: 1,
		},
		{
			label: '2nd menu item',
			value: 2,
		},
		{
			label: '3rd menu item',
			value: 3,
		},
		{
			label: '4rd menu item',
			value: 4,
		},
	];

	const onDateChange: DatePickerProps['onChange'] = (date, dateString) => {
		console.log(date, dateString);
	};

	const props: UploadProps = {
		name: 'file',
		multiple: false,
		action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
		onChange(info) {
			const { status } = info.file;
			if (status !== 'uploading') {
				console.log(info.file, info.fileList);
			}
			if (status === 'done') {
				message.success(`${info.file.name} file uploaded successfully.`);
			} else if (status === 'error') {
				message.error(`${info.file.name} file upload failed.`);
			}
		},
		onDrop(e) {
			console.log('Dropped files', e.dataTransfer.files);
		},
	};

	const authors: SelectProps['options'] = [];

	for (let i = 10; i < 36; i++) {
		authors.push({
			label: 'Jan Kowalski',
			value: i,
		});
	}

	const handleAuthorsChange = (value: number[]) => {
		console.log(`selected ${value}`);
	};

	return (
		<>
			<Header></Header>
			<main>
				<Wrapper>
					<div className="poppins-semibold header">Create book</div>

					<CreateBookForm>
						<Input placeholder="Title" />
						<Select
							style={{ width: '100%' }}
							placeholder="Language"
							value={selectedLanguageIds}
							onChange={(value) => setSelectedLanguageIds(value)}
							options={items}
							filterOption={(input: string, option: DefaultOptionType | undefined) =>
								typeof option?.label === 'string' &&
								(option?.label?.toLowerCase().indexOf(input.toLowerCase()) ?? -1) >= 0
							}
						/>

						<DatePicker onChange={onDateChange} style={{ width: '100%' }} placeholder="Date of publication" />
						<InputNumber style={{ width: '100%' }} placeholder="Number of pages" />
						<Input placeholder="ISBN number" />
						<TextArea placeholder="description" aria-multiline="true" />
						<Select
							style={{ width: '100%' }}
							placeholder="Genre"
							value={selectedGenreIds}
							onChange={(value) => setSelectedGenreIds(value)}
							options={items}
							filterOption={(input: string, option: DefaultOptionType | undefined) =>
								typeof option?.label === 'string' &&
								(option?.label?.toLowerCase().indexOf(input.toLowerCase()) ?? -1) >= 0
							}
						/>

						<div
							className="poppins-light"
							style={{
								fontSize: '12px',
								color: '#8c8c8c',
							}}
						>
							Upload a cover image for the book
						</div>
						<ImageInput value={cover} onChange={(file) => setCover(file)} />
						<div
							className="poppins-semibold"
							style={{
								fontSize: '22px',
							}}
						>
							Author’s section
						</div>
						<Select
							mode="multiple"
							allowClear
							style={{ width: '100%' }}
							placeholder="Select author(s)"
							onChange={handleAuthorsChange}
							options={authors}
							filterOption={(input: string, option: DefaultOptionType | undefined) =>
								typeof option?.label === 'string' &&
								(option?.label?.toLowerCase().indexOf(input.toLowerCase()) ?? -1) >= 0
							}
						/>
						<div
							className="poppins-regular"
							style={{
								fontSize: '18px',
							}}
						>
							Add new author
						</div>

						<CreateAuthorForm>
							<div>
								<Input style={{ width: '100%' }} placeholder="Name" />
								<Input style={{ width: '100%' }} placeholder="Surname" />
							</div>
							<OutlinedButton text="Add author" />
						</CreateAuthorForm>
					<AscentButton text="Send book to review" />
					</CreateBookForm>
				</Wrapper>
			</main>
		</>
	);
};
