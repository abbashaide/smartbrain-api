
const handleSignin = (dB, bcrypt) => (req, res) => {       //You see here it will catch (dB, bcrypt), then (req, res) and then run whatever
	const { email, password } = req.body;                    //is in the body. Remember advanced functions? Also its a matter of prefrence you can use either
	if(!email || !password){
		return res.status(400).json('incorrect form submission');
	}

	dB.select('email', 'hash').from('login')
	.where('email', '=', email)
	.then(data => {
		
		const isUserValid = bcrypt.compareSync(password, data[0].hash);
		
		if(isUserValid){
			return dB.select('*').from('users')
			.where('email', '=', email)
			.then(user => {
				res.json(user[0]);
			})
			.catch(err => res.status(400).json('unable to get user')) //this catch is for if user is not grabbed properly
		}else {
			res.status(400).json('wrong credentials'); //this one's if user not valid or wrong password
		}
	})
	.catch(err => res.status(400).json('wrong credentials'))   // this ones if wrong email
}

module.exports = {
	handleSignin: handleSignin
};