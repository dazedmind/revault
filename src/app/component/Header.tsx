

const Header = () =>{
    return(
        <header className="flex flex-row align-middle z-50 items-center justify-between text-xl font-mono w-full bg-transparent p-8 px-16">
        <div className="flex align-middle items-center gap-10">
          <a href="/login" className="font-bold text-3xl text-teal">ReVault</a>
        </div>
      </header>
    )
}

export default Header;