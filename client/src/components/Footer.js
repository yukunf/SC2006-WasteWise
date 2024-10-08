
const footerBg = require("../images/footerBg.png")
const wastewiseLogo = require("../images/wastewiseLogoVer1.png")

const Footer = () => {
    return (
        <div className="w-full h-[500px] bg-cover bg-center relative" style={{ backgroundImage: `url(${footerBg})`}}>
            <div className="absolute inset-0 flex justify-center flex-col ml-20">
            <img src={wastewiseLogo} className="w-[100px] m-10"></img>
            <p className="text-white text-base font-normal font-poppins ml-10 text-left">+65 8765 4321<br/>info@wastewise.com</p>
            </div>            
        </div>
    )
}

export default Footer;