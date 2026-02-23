import { ButtonElem } from "../../components/ui/ButtonElem";
import { LayoutButton } from "../../components/ui/LayoutButton"


export const Settings = () => {
    const handleClear = (): void => {
        localStorage.clear()
        window.location.reload();
    }
  return (
    <div className="settings-container">
        <section className="appearance">
            <header><h2>Appearance</h2></header>
            <div className="text-settings">
                <p style={{display: "flex"}}>Поменять тему: <LayoutButton /></p>
                <p>Выбор акцета: </p>
                <p>Размер шрифта: </p>
            </div>
        </section>
        <section className="Data">
            <header><h2>Data</h2></header>
            <div className="text-settings">
                <p>Очистка данных на сайте (все данные сотрутся)</p>
                <div onClick={() => handleClear()}><ButtonElem widthElem="150px" heightElem="40px">Очистить данные</ButtonElem></div>
            </div>
        </section>
        <section className="About">
            <header><h2>About</h2></header>
            <div className="text-settings">
                <p>Версия проекта: 0.0.1</p>
                <p>Мой GitHub: <a href="https://github.com/KreiNafig">Krein</a></p>
            </div>
        </section>
    </div>
  )
}
