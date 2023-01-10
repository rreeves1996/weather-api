import React, { useState } from 'react';
import { BsFillCloudMoonFill } from 'react-icons/bs';

export default function Search({ handleSearch, handleQueryReq, history }) {
	const [formState, setFormState] = useState({ search: '' });

	const handleChange = (event) => {
		const { name, value } = event.target;

		setFormState({
			...formState,
			[name]: value,
		});
	};

	const handleSearchSubmit = (event) => {
		event.preventDefault();

		const search = formState.search.trim();

		handleSearch(search);

		setFormState({ search: '' });
	};

	return (
		<div className='dashboard-search container'>
			<header>
				<BsFillCloudMoonFill className='cloud' />
			</header>
			<section className='search'>
				<form className='search-form' onSubmit={handleSearchSubmit}>
					<input
						className='search'
						type='text'
						name='search'
						value={formState.search}
						onChange={(e) => handleChange(e)}
						placeholder='Search for another location...'
					/>
					<button type='submit'>Search</button>
				</form>
			</section>
			{history ? (
				<section className='history'>
					<h5>History:</h5>
					<div className='history-item-container'>
						{history.map((item) => (
							<p
								className='history-item'
								onClick={() => handleQueryReq(item.text)}>
								{item.text}
							</p>
						))}
					</div>
				</section>
			) : (
				<></>
			)}
		</div>
	);
}
