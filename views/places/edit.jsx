const React = require('react');
const Def = require('../default');

function EditForm(data){
    return (
        <Def>
            <main>
                <h1>Edit Place</h1>
                <form method="POST" action={`/places/${data.place.id}/edit?_method=PUT`}>
                    <div className='row'>
                    <div className='form-group col-sm-6 col-md-4 col-lg-3'>
                        <label htmlFor='name'>Place Name</label>
                        <input className="form-control" name="name" id="name" defaultValue={data.place.name} required />
                    </div>
                    <div className='form-group col-sm-6 col-md-4 col-lg-3'>
                        <label htmlFor='pic'>Place Picture</label>
                        <input className='form-control' id="pic" name="pic" defaultValue = {data.place.pic}/>
                    </div>
                    <div className='form-group col-sm-6 col-md-4 col-lg-3'>
                        <label htmlFor='city'>City</label>
                        <input className='form-control' id="city" name="city" defaultValue = {data.place.city} />
                    </div>
                    <div className='form-group col-sm-6 col-md-4 col-lg-3'>
                        <label htmlFor='state'>State</label>
                        <input className='form-control' id="state" name="state" defaultValue={data.place.state}/>
                    </div>
                    <div className='form-group col-sm-6 col-md-4 col-lg-3'>
                        <label htmlFor='cuisines'>Cuisines</label>
                        <input className='form-control' id="cuisines" name="cuisines" defaultValue={data.place.cuisines} required />
                    </div>
                    <div className='form-group col-sm-6 col-md-4 col-lg-3'>
                        <label htmlFor='founded'>Founded In</label>
                        <input className='form-control' id='founded' name='founded' defaultValue={data.place.founded}/>
                    </div>
                    <input className='btn btn-primary' type="submit" value="Update Place" />
                    </div>
                </form>
            </main>
        </Def>
    )
}

module.exports = EditForm