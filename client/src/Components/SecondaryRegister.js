import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Base from "./Base";
import { toast } from "react-toastify";
import "../CSS/Login.css";
import "react-toastify/dist/ReactToastify.css";
import { PiDogFill } from "react-icons/pi";
import CreatableSelect from "react-select/creatable";

const SecondaryRegister = () => {
  const [petName, setPetName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [breed, setBreed] = useState(null);;
  const [vaccinated, setvaccinated] = useState("");
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const [characterCount, setCharacterCount] = useState(0);
  const [focus, setFocus] = useState(false);

  const navigate = useNavigate();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file); // Store the selected image file in the state
  };

  const handleOnChange = (e) => {
    setText(e.target.value);
    const textarea = document.querySelector("textarea");
    textarea.addEventListener("keydown", (e) => {
      textarea.style.height = "auto";
      var scHeight = e.target.scrollHeight;
      textarea.style.height = `${scHeight}px`;
    });
    setCharacterCount(e.target.value.length);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (gender === "") {
      toast.error("Please select your pet's gender");
      return;
    }
    if (vaccinated === "") {
      toast.error("Please select if vaccinated");
      return;
    }
    if (breed === "") {
      toast.error("Please mention pet's breed");
    }

    try {
      const formData = new FormData();
      formData.append("name", petName);
      formData.append("dob", dob);
      formData.append("gender", gender);
      formData.append("breed", breed);
      formData.append("vaccinated", vaccinated === "yes");
      formData.append("image", image); // Append the image file to the FormData
      formData.append("bio", text);

      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/secondaryregister`,
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      if (response.status === 200) {
        toast.success("Registration Successful!");
        navigate("/profile");
      } else {
        toast.error("Registration Failed!");
      }
    } catch (err) {
      toast.error(err);
    }
  };

  const handleCircularClick = () => {
    // Trigger the file input when the circular container is clicked
    document.getElementById("inputImage").click();
  };

  const breedOptions = [
    { value: "Labrador", label: "Labrador" },
    { value: "Beagle", label: "Beagle" },
    { value: "Pomeranian", label: "Pomeranian" },
    { value: "Indian Pariah", label: "Indian Pariah" },
    { value: "Golden Retriever", label: "Golden Retriever" },
    { value: "Pug", label: "Pug" },
    { value: "Indian Spitz", label: "Indian Spitz" },
    { value: "Shih Tzu", label: "Shih Tzu" },
    { value: "Siberian Husky", label: "Siberian Husky" },
    { value: "Chihuahua", label: "Chihuahua" },
    { value: "Cocker Spaniel", label: "Cocker Spaniel" },
    { value: "Bull Dog", label: "Bull Dog" },
    { value: "German Shepherd", label: "German Shepherd" },
    { value: "Great Dane", label: "Great Dane" },
    { value: "Rottweiler", label: "Rottweiler" },
    { value: "Boxer", label: "Boxer" },
    { value: "Dalmatian", label: "Dalmatian" },
    { value: "Doberman", label: "Doberman" },
    { value: "Pitbull", label: "Pitbull" },
    { value: "Lhasa Apso", label: "Lhasa Apso" },
    { value: "Pembroke Welsh Corgi", label: "Pembroke Welsh Corgi" },
    { value: "Australian Shepherd", label: "Australian Shepherd" },
    { value: "Yorkshire Terrier", label: "Yorkshire Terrier" },
  ];

  const handleBreedChange = (selectedOption) => {
    setBreed(selectedOption ? selectedOption.value : null);
    setFocus(false);
  };

  const colorStyles = {
    control: (styles) => ({
      ...styles,
      color: "black",
      borderRadius: 10,
      fontSize: 13,
    }),
    input: (styles) => ({
      ...styles,
      color: "black", // Set text color to black
    }),
    placeholder: (styles) => ({
      ...styles,
      color: "black", // Set placeholder color to black
    }),
  };

  return (
    <>
      <Base />
      <div className="secondaryRegisterContainer">
        <form className="secondaryRegisterationForm" onSubmit={handleSubmit}>
          <div className="secondaryRegisterationInputs">
            <div className="dogInfoLeft">
              <input
                className="inputTabs"
                type="text"
                placeholder="Pet's Name"
                value={petName}
                required
                onChange={(event) => {
                  setPetName(event.target.value);
                }}
              />
              <input
                className="inputTabs"
                type="text"
                placeholder="Date of Birth"
                value={dob}
                required
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
                onChange={(event) => {
                  setDob(event.target.value);
                }}
              />
              <div className="dropdown-container">
                <div>
                  <CreatableSelect
                    className="dropdown"
                    options={breedOptions}
                    placeholder={breed ? breed : "Breed"}
                    value={breed}
                    onChange={handleBreedChange}
                    styles={colorStyles}
                    onFocus={() => {
                      setFocus(true);
                    }}
                    onBlur={() => {
                      setFocus(false);
                    }}
                    isSearchable
                    isClearable
                    {...{ menuContainerStyle: { borderRadius: '10px' }, menuStyle: { fontSize: '13px' } }}
                  />
                </div>
              </div>

              <div className="inputRadio">
                Gender &nbsp;
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  checked={gender === "Male"}
                  onChange={() => {
                    setGender("Male");
                  }}
                />
                <label htmlFor="male">Male</label>
                &nbsp;
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  checked={gender === "Female"}
                  onChange={() => {
                    setGender("Female");
                  }}
                />
                <label htmlFor="female">Female</label>
              </div>
              <div className="inputRadio">
                Vaccinated &nbsp;
                <input
                  type="radio"
                  id="yes"
                  name="playdate"
                  value="yes"
                  checked={vaccinated === "yes"}
                  onChange={() => setvaccinated("yes")}
                />
                <label htmlFor="yes">Yes</label>
                &nbsp;
                <input
                  type="radio"
                  id="no"
                  name="playdate"
                  value="no"
                  checked={vaccinated === "no"}
                  onChange={() => {
                    setvaccinated("no");
                  }}
                />
                <label htmlFor="no">No</label>
              </div>
            </div>

            <div className="dogInfoRight">
              <div>
                <label htmlFor="inputImage">Profile Picture</label>
                <input
                  id="inputImage"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <div
                  className="circular-container"
                  onClick={handleCircularClick}
                >
                  {image ? (
                    <img
                      className="profilePicture"
                      src={URL.createObjectURL(image)}
                      alt="Preview"
                      loading="lazy"
                    />
                  ) : (
                    <PiDogFill className="profileIcon" />
                  )}
                </div>
              </div>

              <span className="textSection">
                <textarea
                  id="Bio"
                  name="Message"
                  value={text}
                  maxLength={100}
                  placeholder="Enter your bio(max 100 characters)"
                  rows="2"
                  onChange={handleOnChange}
                  required
                >
                  {text}
                </textarea>
                <span className="textareaCount">{characterCount}/100</span>
              </span>
            </div>
          </div>

          <div className="btnContainer">
            <Link to="/register" className="btn btn-back">
              &lt; Back
            </Link>
            <button type="submit" className="btn btn-next">
              Register &gt;
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SecondaryRegister;
