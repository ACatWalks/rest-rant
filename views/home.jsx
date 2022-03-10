const React = require('react');
const Def = require('./default');

function home(){
    return (
        <Def>
            <main>
                <h1>REST-Rant</h1>
                <div>
                <img src="/images/joseph-gonzalez-zcUgjyqEwe8-unsplash.jpg" alt="toast with bananas and blueberries"></img>
                <div>
                    Photo by <a href="https://unsplash.com/@miracletwentyone?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Joseph Gonzalez</a> on <a href="https://unsplash.com/photos/zcUgjyqEwe8">Unsplash</a>
                </div>
                </div>
                <a href="/places"><button className="btn-primary">Places Page</button></a>
            </main>
        </Def>
    )
}

module.exports = home