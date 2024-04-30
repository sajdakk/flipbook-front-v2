import React, { useState } from 'react';
import { styled } from 'styled-components';
import { Logo } from './logo';
import { SmallLogo } from './small-logo';
import { Link } from 'react-router-dom';
import { User } from '../types';

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	margin-right: 24px;

	> .menu__btn.open > span {
		transform: rotate(45deg);
	}

	> .menu__btn.open > span::before {
		top: 0;
		transform: rotate(-90deg);
	}

	> .menu__btn.open > span::after {
		top: 0;
		transform: rotate(0deg);
	}

	> .menu__btn {
		position: absolute;
		top: 28px;
		left: 20px;
		width: 26px;
		height: 14px;
		cursor: pointer;
		z-index: 2;
		/* box-sizing: border-box;
    padding: 15px; */
	}

	> .menu__btn > span {
		top: 6px;
	}

	> .menu__btn > span,
	> .menu__btn > span::before,
	> .menu__btn > span::after {
		display: block;
		position: absolute;
		width: 100%;
		height: 2px;
		background-color: #000;
		transition-duration: 0.25s;
	}

	> .menu__btn > span::before {
		content: '';
		top: -6px;
	}

	> .menu__btn > span::after {
		content: '';
		top: 6px;
	}

	> .menu__box.open {
		left: 0 !important;
		z-index: 1;
		background: #fff;
		box-shadow: 0px 0px 10px 0px rgba(218, 223, 225, 0.4);
	}

	> .menu__box {
		display: block;
		position: fixed;
		top: 0;
		left: -200%;
		width: 300px;
		height: 100%;
		margin: 0;
		padding: 80px 0;
		list-style: none;
		background-color: #eceff1;
		box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.4);
		transition-duration: 0.25s;
	}

	> .menu__box button {
		align-self: stretch;
		height: auto;
		background: transparent;
		border-radius: 0px;
		justify-content: center;
		align-items: center;
		gap: 0px;
		white-space: nowrap;
		display: block;
		padding: 0px 0px;
		color: var(--primary-text-light, #373e44);
		text-align: left;
		font-family: Poppins;
		font-size: 18px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
		line-height: normal;
		text-decoration: none;
		transition-duration: 0.25s;
	}

	> .menu__box form {
		align-self: auto;
		flex-direction: column;
		justify-content: flex-start;
		align-items: start;
		gap: 0;
		display: flex;
	}

	> .menu__box .divider {
		margin: 12px 0px;
		border-bottom: 1px solid rgba(0, 0, 0, 0.15);
	}

	.menu__item {
		display: block;
		padding: 4px 24px;
		color: #000;
		text-align: left;
		font-size: 18px;
		transition-duration: 0.25s;
	}

	.secondary_menu__item {
		display: block;
		padding: 4px 24px;
		color: var(--primary-text-light, #373e44);
		text-align: left;
		font-size: 14px;
		text-decoration: none;
		transition-duration: 0.25s;
		box-sizing: border-box;
	}

	> .menu__item:hover {
		background-color: #cfd8dc;
	}
`;

interface Props {
	user: User | null | undefined;
	logout: () => void;
}

export const MobileHeader: React.FC<Props> = ({ user, logout }) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	if (!user) {
		return (
			<Wrapper>
				<div className={`menu__btn ${isMenuOpen ? 'open' : 'closed'}`} onClick={() => setIsMenuOpen((prev) => !prev)}>
					<span></span>
				</div>
				<ul className={`menu__box ${isMenuOpen ? 'open' : 'closed'}`}>
					<li></li>
					<li>
						<Link className="menu__item poppins-regular" to="/">
							Home
						</Link>
					</li>
					<li>
						<Link className="menu__item poppins-regular" to="/top">
							Top
						</Link>
					</li>

					<li className="divider"></li>
					<li>
						<Link className="secondary_menu__item poppins-regular" to="/create">
							Add book
						</Link>
					</li>
					<li>
						<Link className="secondary_menu__item poppins-regular" to="/favorites">
							Favorites
						</Link>
					</li>
					<li>
						<Link className="secondary_menu__item poppins-regular" to="/login">
							Log in
						</Link>
					</li>
					<li>
						<Link className="secondary_menu__item poppins-regular" to="/register">
							Sign up
						</Link>
					</li>
				</ul>
			</Wrapper>
		);
	}

	return (
		<Wrapper>
			<div className={`menu__btn ${isMenuOpen ? 'open' : 'closed'}`} onClick={() => setIsMenuOpen((prev) => !prev)}>
				<span></span>
			</div>
			<ul className={`menu__box ${isMenuOpen ? 'open' : 'closed'}`}>
				<li></li>
				<li>
					<Link className="menu__item poppins-regular" to="/">
						Home
					</Link>
				</li>
				<li>
					<Link className="menu__item poppins-regular" to="/top">
						Top
					</Link>
				</li>

				<li>
					<Link className="menu__item poppins-regular" to="/profile">
						Profile
					</Link>
				</li>

				{user.role.name === 'admin' && (
					<li>
						<Link to="/admin" className="menu__item poppins-regular">
							Admin
						</Link>
					</li>
				)}

				<li className="divider"></li>
				<li>
					<Link className="secondary_menu__item poppins-regular" to="/create">
						Add book
					</Link>
				</li>
				<li>
					<Link className="secondary_menu__item poppins-regular" to="/favorites">
						Favorites
					</Link>
				</li>
				<li>
					<a
						className="secondary_menu__item poppins-regular"
						href="#"
						onClick={(e) => {
							e.preventDefault();
							logout();
						}}
					>
						Log out
					</a>
				</li>
			</ul>
		</Wrapper>
	);
};
