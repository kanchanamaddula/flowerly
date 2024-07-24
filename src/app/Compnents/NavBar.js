import { Linden_Hill } from "next/font/google";
import Link from "next/link";

export default function NavBar() {
    return <div className="NavBar">
        <h1 className="NavBarName">FLOWERLY</h1>
        <div className="NavBarLinks">
            <Link className="NavBarLink" href="/spiecies">SPIECIES</Link>
            <Link className="NavBarLink NavBarLinkBorder" href="/arrangements">ARRANGEMENTS</Link>
            <Link className="NavBarLink" href="/occasion">OCCASSION</Link>
        </div>
    </div>
}