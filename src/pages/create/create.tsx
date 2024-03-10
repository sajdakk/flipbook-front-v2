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

	@media screen and (max-width: 780px) {
		padding-left: 24px;
		padding-right: 24px;

		.header {
			font-size: 20px;
		}
	}
`;

const CreateBookForm = styled.form`
	align-self: stretch;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	gap: 24px;
	display: flex;

	.author-section {
		font-size: 22px;
	}

	.add-new-author-label {
		font-size: 18px;
	}

	@media screen and (max-width: 780px) {
		padding-top: 24px;

		.author-section {
			font-size: 18px;
		}

		.add-new-author-label {
			font-size: 16px;
		}
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

	@media screen and (max-width: 780px) {
		flex-direction: column;
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
						<div className="author-section poppins-semibold">Author’s section</div>
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
						<div className="add-new-author-label poppins-regular">Add new author</div>

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
