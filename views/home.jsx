const React = require('react');
const Def = require('./default');

function home(){
    return (
        <Def>
            <main>
                <h1>Home</h1>
                <button className="btn-primary">Places Page</button>
            </main>
        </Def>
    )
}

module.exports = home