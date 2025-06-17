import React from "react";

export default function Main() {    
    const [meme, setMeme] = React.useState({
        topText: "One does not simply",
        bottomText: "Walk into Mordor",
        imageUrl: "http://i.imgflip.com/1bij.jpg"
    });

    const [memesArray, setMemesArray] = React.useState([]);

    function handleChange(event) {
        const {name, value} = event.target;
        setMeme(prevMeme => ({
            ...prevMeme, [name]: value
        }));
    }

    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(data => {
                const memesArray = data.data.memes;
                setMemesArray(prevMemesArray => ({
                    ...prevMemesArray, [memesArray]: memesArray
                }));
            });
        console.log("Get a new meme image clicked");
        console.log(meme.imageUrl);    
    }, [])

    return (
        <main>
            <div className="form">
                <label>Top Text
                    <input
                        type="text"
                        placeholder="One does not simply"
                        name="topText"
                        onChange={handleChange}
                        value={meme.topText}
                    />
                </label>

                <label>Bottom Text
                    <input
                        type="text"
                        placeholder="Walk into Mordor"
                        name="bottomText"
                        onChange={handleChange}
                        value={meme.bottomText}
                    />
                </label>
                <button>Get a new meme image 🖼</button>
            </div>
            <div className="meme">
                <img src={meme.imageUrl} />
                <span className="top">{meme.topText}</span>
                <span className="bottom">{meme.bottomText}</span>
            </div>
        </main>
    )
}