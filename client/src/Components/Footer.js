import { Link, useNavigate } from "react-router-dom";
import Footerimg from "../images/FooterTop.png";
import "../CSS/Footer.css";
import { useCookies } from "react-cookie";

export default function Footer() {
  const navigate = useNavigate();
  const[cookies]=useCookies();
  const userID=cookies.userID;

  const logout = async() =>{
    try{
      const response =await fetch(`${process.env.REACT_APP_BASE_URL}/logout`,{
        method: 'GET',
        credentials: 'include', 
      });
      if (response.status === 200) {
        // Successfully logged out
        navigate("/login")
      } else {
        console.log("bad response")
      }
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div>
      <div className="footer-container">
        <div>
          <img className="footer-img" src={Footerimg}></img>
        </div>
        <div className="footer">
          <div className="about-wiggles">
            <h3 className="footer-heading">About Wiggles</h3>
            <p>
              Wiggles is a platform where pet owners can effortlessly
              arrange playdates for their furry friends, share pet-care
              insights, and forge lasting connections. Wiggles isn't just a
              social space; it's a vibrant community where pets take center
              stage. 🐾 <br/>But we're more than just a platform; we're an
              open-source project. This means our community shapes Wiggles,
              ensuring it evolves with your needs. At Wiggles, 
              every wag, chirp, or meow deserves to find its kindred
              spirit.
            </p>
          </div>
          <div className="support-wiggles">
            <h3 className="footer-heading">Support</h3>
            <div className="supportLogin">
              <Link className="support-links" to="/Explore">
                Explore
              </Link>
              <Link to="/Contact" className="support-links">
                Contact Us
              </Link>
              <Link className="support-links" to="/Friends">
                Friends
              </Link>
              {(userID) && 
              <div className="support-links" onClick={logout}>
                Logout
              </div>}
              <Link to="/AboutCreators" className="support-links">
                Creators
              </Link>
            </div>
          </div>
        </div>
        <div className="copyright-bar">
          Copyright © 2023 - Wiggles - All rights reserved
        </div>
      </div>
    </div>
  );
}
