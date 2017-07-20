//***********************
// ACCOUNTINFORMATION (stored in ANDROID ACCOUNTMANAGER (or localStorage for IOS))
//***********************
interface IUserData {
	idAccount: Number;
	idPerson: Number;
	username: String;
	title: String;
	lastname: String;
	firstname: String;
	email: String
}

interface IRegistrationData {
	uniqueDeviceId: String;
	registrationName: String;
	licenseKey: String;
	domain: String;
	registered: Boolean;
	trial: Boolean
}

/*
    Interface of account information.
*/
interface IAccountInformation {
	password: String;
	userData: IUserData;
	registrationData: IRegistrationData;
	validAccount: Boolean;
	lastLoginAt: Date;
	AM: Boolean
	url: String
}

/*
Class to hold the account information like username, password
*/
class AccountInformation {
	private accountInfoData: IAccountInformation;
	constructor(doc: any) {
		if (doc) {
			this.accountInfoData = doc.accountInfoData;
		} else {
			this.accountInfoData = {
				password: '',
				userData: {
					idAccount: -1,
					idPerson: -1,
					username: '',
					title: '',
					lastname: '',
					firstname: '',
					email: ''
				},
				registrationData: {
					uniqueDeviceId: '',
					registrationName: '',
					licenseKey: '',
					domain: '',
					registered: false,
					trial: false
				},
				lastLoginAt: null,
				validAccount: false,
				AM: false,
				url: ''
			}
		}
	}

	getLastLoginAt(): Date {
		return this.accountInfoData.lastLoginAt;
	}

	setLastLoginAt(lastLoginAt: Date): void {
		this.accountInfoData.lastLoginAt = lastLoginAt;
	}

	isLoggedInLastTenDays(): Boolean {
		if (this.accountInfoData.lastLoginAt) {
			let oneDay = 24 * 60 * 60 * 1000;
			let diffDays = Math.round(Math.abs((this.accountInfoData.lastLoginAt.getTime() - new Date().getTime()) / (oneDay)));
			return (diffDays <= 10);
		} else {
			return false;
		}
	}

	getTitle(): String {
		return this.accountInfoData.userData.title;
	}

	setTitle(title: String): void {
		this.accountInfoData.userData.title = title;
	}

	setUserName(username: String): void {
		this.accountInfoData.userData.username = username;
	}

	getUserName(): String {
		return this.accountInfoData.userData.username;
	}

	setPassword(password: String): void {
		this.accountInfoData.password = password;
	}

	getPassword(): String {
		return this.accountInfoData.password;
	}

	setLastName(lastname: String): void {
		this.accountInfoData.userData.lastname = lastname;
	}

	getLastName(): String {
		return this.accountInfoData.userData.lastname;
	}

	setFirstName(firstname: String): void {
		this.accountInfoData.userData.firstname = firstname;
	}

	getFirstName(): String {
		return this.accountInfoData.userData.firstname;
	}

	setEmail(email: String): void {
		this.accountInfoData.userData.email = email;
	}

	getEmail(): String {
		return this.accountInfoData.userData.email;
	}

	isValidAccount(): Boolean {
		return this.accountInfoData.validAccount;
	}

	setValidAccount(isValidAccount: Boolean): void {
		this.accountInfoData.validAccount = isValidAccount;
	}

	setUserData(userData: IUserData): void {
		this.accountInfoData.userData = userData;
	}

	getUserData(): IUserData {
		return this.accountInfoData.userData;
	}

	setRegistrationData(registrationData: IRegistrationData): void {
		this.accountInfoData.registrationData = registrationData;
	}

	getRegistrationData(): IRegistrationData {
		return this.accountInfoData.registrationData;
	}

	setAM(AM: Boolean): void {
		this.accountInfoData.AM = AM;
	}

	isAM(): Boolean {
		return this.accountInfoData.AM;
	}

	setAccountId(idAccount: Number): void {
		this.accountInfoData.userData.idAccount = idAccount;
	}

	getAccountId(): Number {
		return this.accountInfoData.userData.idAccount;
	}

	setPersonId(idPerson: Number): void {
		this.getUserData().idPerson = idPerson;
	}

	getPersonId(): Number {
		return this.accountInfoData.userData.idPerson;
	}
	getUniqueDeviceId(): String {
		return this.accountInfoData.registrationData.uniqueDeviceId;
	}

	setUniqueDeviceId(uniqueDeviceId: String): void {
		this.accountInfoData.registrationData.uniqueDeviceId = uniqueDeviceId;
	}

	getRegistrationName(): String {
		return this.accountInfoData.registrationData.registrationName;
	}

	setRegistrationName(registrationName: String): void {
		this.accountInfoData.registrationData.registrationName = registrationName;
	}

	setRegistered(registered: Boolean): void {
		this.accountInfoData.registrationData.registered = registered;
	}

	isRegistered(): Boolean {
		return this.accountInfoData.registrationData.registered;
	}

	setTrial(trial: Boolean): void {
		this.accountInfoData.registrationData.trial = trial;
	}

	isTrial(): Boolean {
		return this.accountInfoData.registrationData.trial;
	}

	setDomain(domain: String): void {
		this.accountInfoData.registrationData.domain = domain;
	}

	getDomain(): String {
		return this.accountInfoData.registrationData.domain;
	}

	setLicenseKey(licenseKey: String): void {
		this.accountInfoData.registrationData.licenseKey = licenseKey;
	}

	getLicenseKey(): String {
		return this.accountInfoData.registrationData.licenseKey;
	}

	setUrl(url: String): void {
		this.accountInfoData.url = url;
	}

	getUrl(): String {
		return this.accountInfoData.url;
	}

	getFullName(): String {
		let result = (this.getTitle() ? this.getTitle() : '');
		result += ' ' + (this.getFirstName() ? this.getFirstName() : '');
		result += ' ' + (this.getLastName() ? this.getLastName() : '');
		return result.trim();
	}
}


//***********************
// PERSON
//***********************
interface IPerson {
	_id?: String;
	_rev?: String;
	id: Number;
	title?: String;
	firstname: String;
	lastname: String;
	username: String;
	password: String;
	email: String;
}

class Person {
	private _id: String;
	private _rev: String;
	private id: Number;
	private title: String;
	private firstname: String;
	private lastname: String;
	private username: String;
	private password: String;
	private email: String;

	constructor(doc: IPerson) {
		if (doc) {
			this.id = doc.id;
			this.title = doc.title;
			this.firstname = doc.firstname;
			this.lastname = doc.lastname;
			this.username = doc.username;
			this.password = doc.password;
			this.email = doc.email;
			this._id = doc._id ? doc._id : this.createPouchId();
			this._rev = doc._rev;
		}
	}

	createPouchId(): String {
		return 'PERSON' + this.id;
	}

	getId(): Number {
		return this.id;
	}

	getFullName(): String {
		let result = (this.title ? this.title : '');
		result += ' ' + (this.firstname ? this.firstname : '');
		result += ' ' + (this.lastname ? this.lastname : '');
		return result.trim();
	}

	setEmail(email: String): void {
		this.email = email;
	}

	getEmail(): String {
		return this.email;
	}
}