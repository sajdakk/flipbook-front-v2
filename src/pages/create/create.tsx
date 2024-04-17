import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Header } from '../../components/header/header';
import { DatePicker, DatePickerProps, Form, Input, InputNumber, Select, Skeleton, message } from 'antd';
import { DefaultOptionType, SelectProps } from 'antd/es/select';
import TextArea from 'antd/es/input/TextArea';
import { ImageInput } from '../../components/image_input';
import { OutlinedButton } from '../../components/outlined-button';
import { AscentButton } from '../../components';
import { useCreate } from './use_create';
import { AuthorDto } from '../../utils/api';

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

const CreateAuthorSection = styled.div`
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
	const [selectedAuthors, setSelectedAuthors] = useState<AuthorDto[]>([]);
	const [selectedAuthorOptions, setSelectedAuthorOptions] = useState<string[]>([]);
	const [newAuthorName, setNewAuthorName] = useState('');
	const [newAuthorSurname, setNewAuthorSurname] = useState('');
	const [authorOptions, setAuthorOptions] = useState<DefaultOptionType[]>([]);
	const [date, setDate] = useState<Date | null>(null);
	const [form] = Form.useForm();

	const [cover, setCover] = useState<File | null>(null);
	const { user, languages, genres, authors, addBook } = useCreate();

	useEffect(() => {
		if (!authors) {
			return;
		}

		setAuthorOptions(
			authors.map((author) => ({
				label: `${author.name} ${author.surname}`,
				value: `${author.name} ${author.surname}`,
			}))
		);
	}, [authors]);

	useEffect(() => {
		const titleInput = document.querySelector('#title');
		titleInput?.setAttribute('placeholder', 'Title');

		const languageInput = document.querySelector('.ant-select-selector');
		languageInput?.setAttribute('placeholder', 'Language');

		const dateInput = document.querySelector('.ant-picker-input');
		dateInput?.setAttribute('placeholder', 'Date of publication');

		const pagesInput = document.querySelector('.ant-input-number-input');
		pagesInput?.setAttribute('placeholder', 'Number of pages');

		const isbnInput = document.querySelector('.ant-input');
		isbnInput?.setAttribute('placeholder', 'ISBN number');

		const descriptionInput = document.querySelector('.ant-input');
		descriptionInput?.setAttribute('placeholder', 'Description');

		const genreInput = document.querySelector('.ant-select-selector');
		genreInput?.setAttribute('placeholder', 'Genre');

		const coverInput = document.querySelector('.ant-upload');
		coverInput?.setAttribute('placeholder', 'Cover image');

		const authorInput = document.querySelector('.ant-select-selector');
		authorInput?.setAttribute('placeholder', 'Select author(s)');

		const addAuthorInput = document.querySelector('.ant-input');
		addAuthorInput?.setAttribute('placeholder', 'Name');

		const surnameInput = document.querySelector('.ant-input');
		surnameInput?.setAttribute('placeholder', 'Surname');
	}, []);

	if (!user) {
		return (
			<>
				<Header></Header>
				<main>
					<Wrapper>
						<div className="poppins-semibold header">You have to log in to create a book</div>
					</Wrapper>
				</main>
			</>
		);
	}

	if (languages === undefined || genres === undefined || authors === undefined) {
		return (
			<>
				<Header></Header>
				<main>
					<Wrapper>
						<Skeleton active />
					</Wrapper>
				</main>
			</>
		);
	}

	const languageOptions: DefaultOptionType['items'] = languages.map((language) => ({
		label: language.language,
		value: language.id,
	}));

	const genreOptions: DefaultOptionType['items'] = genres.map((genre) => ({
		label: genre.title,
		value: genre.id,
	}));

	const _onSubmit = (e: any) => {
		form
			.validateFields()
			.then((value) => {
				addBook({
					title: value.title,
					genre_id: value.genre_id,
					language_id: value.language_id,
					date_of_publication: value.date_of_publication,
					page_count: value.page_count,
					image: '',
					imageExtension: '',
					isbn_number: value.isbn_number,
					description: value.description,
					created_by: user.id,
					authors: selectedAuthors,
				});
			})
			.catch((_) => {});
	};

	const handleAuthorsChange = (value: string[]) => {
		const selectedAuthors = authors.filter((author) => value.includes(`${author.name} ${author.surname}`));
		setSelectedAuthors(selectedAuthors);
		setSelectedAuthorOptions(value);
	};

	const _addNewAuthor = () => {
		if (!newAuthorName || !newAuthorSurname) {
			message.error('Author name and surname are required');
			return;
		}
		const authorString = `${newAuthorName} ${newAuthorSurname}`;

		const exist = authorOptions?.some((author) => {
			return author.value == authorString;
		});
		setNewAuthorName('');
		setNewAuthorSurname('');

		if (exist === true) {
			message.error('Author already exists');
			return;
		}

		const newAuthor: AuthorDto = {
			id: undefined,
			name: newAuthorName,
			surname: newAuthorSurname,
		};

		setAuthorOptions([
			...authorOptions,
			{
				label: `${newAuthor.name} ${newAuthor.surname}`,
				value: `${newAuthor.name} ${newAuthor.surname}`,
			},
		]);

		setSelectedAuthors([...selectedAuthors, newAuthor]);
		setSelectedAuthorOptions([...selectedAuthorOptions, `${newAuthor.name} ${newAuthor.surname}`]);
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
							options={languageOptions}
							filterOption={(input: string, option: DefaultOptionType | undefined) =>
								typeof option?.label === 'string' &&
								(option?.label?.toLowerCase().indexOf(input.toLowerCase()) ?? -1) >= 0
							}
						/>

						<DatePicker value={date} onChange={setDate} style={{ width: '100%' }} placeholder="Date of publication" />
						<InputNumber style={{ width: '100%' }} placeholder="Number of pages" />
						<Input placeholder="ISBN number" />
						<TextArea placeholder="description" aria-multiline="true" />
						<Select
							style={{ width: '100%' }}
							placeholder="Genre"
							value={selectedGenreIds}
							onChange={(value) => setSelectedGenreIds(value)}
							options={genreOptions}
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
							options={authorOptions}
							value={selectedAuthorOptions}
							filterOption={(input: string, option: DefaultOptionType | undefined) =>
								typeof option?.label === 'string' &&
								(option?.label?.toLowerCase().indexOf(input.toLowerCase()) ?? -1) >= 0
							}
						/>
						<div className="add-new-author-label poppins-regular">Add new author</div>

						<CreateAuthorSection>
							<div>
								<Input
									style={{ width: '100%' }}
									placeholder="Name"
									value={newAuthorName}
									onChange={(e) => setNewAuthorName(e.target.value)}
								/>
								<Input
									style={{ width: '100%' }}
									placeholder="Surname"
									value={newAuthorSurname}
									onChange={(e) => setNewAuthorSurname(e.target.value)}
								/>
							</div>
							<OutlinedButton
								htmlType="button"
								onClick={() => {
									_addNewAuthor();
								}}
								text="Add author"
							/>
						</CreateAuthorSection>
						<AscentButton>Send book to review</AscentButton>
					</CreateBookForm>
				</Wrapper>
			</main>
		</>
	);
};
