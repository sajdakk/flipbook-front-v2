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
import { colors } from '../../styles/colors';

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

const CreateBookForm = styled.div`
	align-self: stretch;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	gap: 24px;
	display: flex;

	.inputs {
		display: flex;
		flex-direction: column;
		width: 100%;
		gap: 24px;

		> p.error {
			height: 21px;
			margin: 0px;

			color: ${() => colors.statusDanger};
		}

		.ant-form-item {
			margin-bottom: 0px;
		}
	}

	.author-section {
		font-size: 22px;
	}

	.add-new-author-label {
		font-size: 18px;
	}

	> p.error {
		height: 21px;
		margin: 0px;

		color: ${() => colors.statusDanger};
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

	> .author-inputs {
		width: 100%;
		display: flex;
		align-self: stretch;
		align-items: stretch;
	}

	@media screen and (max-width: 780px) {
		flex-direction: column;
	}
`;

export const Create: React.FC = () => {
	const [selectedLanguageIds, setSelectedLanguageIds] = useState<number[]>([]);
	const [selectedGenreIds, setSelectedGenreIds] = useState<number[]>([]);
	const [selectedAuthors, setSelectedAuthors] = useState<AuthorDto[]>([]);
	const [newAuthorName, setNewAuthorName] = useState('');
	const [newAuthorSurname, setNewAuthorSurname] = useState('');
	const [authorOptions, setAuthorOptions] = useState<DefaultOptionType[]>([]);
	const [form] = Form.useForm();
	const [loading, setLoading] = useState(false);

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

	const sendBook = async (value: any) => {
		const coverExtension = cover?.type.split('/')[1];
		if (!coverExtension) {
			message.error(`Nie udało się pobrać rozszerzenia okładki (${cover?.type})`);

			return;
		}
		setLoading(true);
		const coverContent = await cover.arrayBuffer();
		const coverBuffer = Buffer.from(coverContent);

		await addBook({
			title: value.title,
			genre_id: value.genre,
			language_id: value.language,
			date_of_publication: value.date,
			page_count: value.pages,
			image: coverBuffer.toString('base64'),
			imageExtension: coverExtension,
			isbn_number: value.isbn,
			description: value.description,
			created_by: user.id,
			authors: selectedAuthors,
		});
		setLoading(false);
	};

	const _onSubmit = (e: any) => {
		form
			.validateFields()
			.then((value) => sendBook(value))
			.catch((_) => {});
	};

	const handleAuthorsChange = (value: string[]) => {
		const selectedAuthors = authors.filter((author) => value.includes(`${author.name} ${author.surname}`));
		setSelectedAuthors(selectedAuthors);
		form.setFieldsValue({
			authors: value,
		});
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
		// Clear input fields
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
				label: authorString,
				value: authorString,
			},
		]);

		const selectedAuthorOptions = form.getFieldValue('authors') ?? [];
		const newSelectedAuthorsOptions = [...selectedAuthorOptions, authorString];

		setSelectedAuthors([...selectedAuthors, newAuthor]);
		form.setFieldsValue({
			authors: newSelectedAuthorsOptions,
		});
	};

	return (
		<>
			<Form onFinish={_onSubmit} scrollToFirstError form={form}>
				<Header></Header>
				<main>
					<Wrapper>
						<div className="poppins-semibold header">Create book</div>

						<CreateBookForm>
							<div className="inputs">
								<Form.Item
									name="title"
									rules={[
										{
											required: true,
											message: 'Please provide title!',
										},
									]}
								>
									<Input placeholder="Title" />
								</Form.Item>
								<Form.Item
									name="language"
									rules={[
										{
											required: true,
											message: 'Please provide language!',
										},
									]}
								>
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
								</Form.Item>

								<Form.Item
									name="date"
									rules={[
										{
											required: true,
											message: 'Please provide date of publication!',
										},
									]}
								>
									<DatePicker style={{ width: '100%' }} placeholder="Date of publication" />
								</Form.Item>
								<Form.Item
									name="pages"
									rules={[
										{
											required: true,
											message: 'Please provide number of pages!',
										},
									]}
								>
									<InputNumber style={{ width: '100%' }} placeholder="Number of pages" />
								</Form.Item>
								<Form.Item
									name="isbn"
									rules={[
										{
											required: true,
											message: 'Please provide number of pages!',
										},
									]}
								>
									<Input placeholder="ISBN number" />
								</Form.Item>
								<Form.Item
									name="description"
									rules={[
										{
											required: true,
											message: 'Please provide description!',
										},
									]}
								>
									<TextArea placeholder="description" aria-multiline="true" />
								</Form.Item>
								<Form.Item
									name="genre"
									rules={[
										{
											required: true,
											message: 'Please provide genre!',
										},
									]}
								>
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
								</Form.Item>

								<div
									className="poppins-light"
									style={{
										fontSize: '12px',
										color: '#8c8c8c',
									}}
								>
									Upload a cover image for the book
								</div>
								<Form.Item
									name="cover"
									rules={[
										{
											required: true,
											message: 'Please provide cover!',
										},
									]}
								>
									<ImageInput value={cover} onChange={(file) => setCover(file)} />
								</Form.Item>

								<div className="author-section poppins-semibold">Author’s section</div>
								<Form.Item
									name="authors"
									rules={[
										{
											required: true,
											message: 'Please provide authors!',
										},
									]}
									dependencies={[authorOptions]}
								>
									<Select
										mode="multiple"
										allowClear
										style={{ width: '100%' }}
										placeholder="Select author(s)"
										onChange={handleAuthorsChange}
										options={authorOptions}
										filterOption={(input: string, option: DefaultOptionType | undefined) =>
											typeof option?.label === 'string' &&
											(option?.label?.toLowerCase().indexOf(input.toLowerCase()) ?? -1) >= 0
										}
									/>
								</Form.Item>

								<div className="add-new-author-label poppins-regular">Add new author</div>

								<CreateAuthorSection>
									<div className="author-inputs">
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
									<OutlinedButton htmlType="button" onClick={_addNewAuthor} text="Add author" />
								</CreateAuthorSection>
							</div>
							<AscentButton loading={loading} htmlType="submit">
								Send book to review
							</AscentButton>
						</CreateBookForm>
					</Wrapper>
				</main>
			</Form>
		</>
	);
};
