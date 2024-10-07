import './Header.scss'
import Logo from '../assets/icons/Logo.svg'
import LigthThemeSwift from '../assets/icons/DayNightSwitch.svg'
import Avatar from '../assets/images/avatar.png'

function Header() {
    return (
        <header className='header'>
            <div className='header__logo-group'>
                <img className='header__logo' src={Logo} alt="РосБанк" />
                <h1 className='header__title'>SuperStars</h1>
            </div>
            <div className='header__user'>
                <img className='header__swift' src={LigthThemeSwift} alt='Здесь будет переключение темы' />
                <p className='header__name'>Привет, Артур Владимирович!</p>
                <img className='header__photo' src={Avatar} alt='фото пользователя' />
            </div>
        </header>
    )
}

export default Header