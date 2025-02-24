const {
	scryptSync,
	randomFillSync,
	getCiphers,
	createCipheriv,
	createDecipheriv,
} = await import('node:crypto');

// crypto.randomBytes is being ran sync here, which will cause a block in script processing.
// it is doing this because it needs to reach out to the OS for randomness via entropy
const settings = {
	random_setting: 'this is to help test some syntax below',
	encryption_method: 'aes-256-cbc',
	// the length of the is dependent on the cipher algorithm.
	// aes-256 needs 256 bits for the key
	// bytes are 8 bits.
	// 256/8 = 32, so we need 32 bytes of generated data for the key.
	// for more reading: https://www.measuringknowhow.com/understanding-what-is-the-key-length-for-aes-256/
	secret_key_length: 32,
	// aes is a block cipher.
	// the iv is dependent on the length of the block.
	// the block must be 128 bits.
	// 128/8 = 16, so we need 16 bytes of generated data
	// for more reading: https://engineering.purdue.edu/kak/compsec/NewLectures/Lecture8.pdf
	secret_iv_length: 16,
	// handy dandy random string generator: https://api.wordpress.org/secret-key/1.1/salt/
	// yes, normally this would live in .env, but I don't care since this code exists for testing
	password:
		'li/,{ng)S.x|LE8!-kqv-_T]kh=dgrwXrB;hN_-:Cq-]t`px{W!*qqbY+]#a~|sQ',
	salt: 'Rp4k5yJz;}-y!!bT+wWnPTz:,a,)r#E.b%cz|$8-oHpGl91#;G$ lm4gL_`uyy?S',
};

const {
	password,
	salt,
	secret_key_length,
	secret_iv_length,
	encryption_method,
} = settings;

// the in operator not working on arrays in javascript is a crime against humanity.
if (!getCiphers().includes(encryption_method)) {
	console.error(
		`${encryption_method} is missing. Please review the available ciphers in openssl. e.g. openssl enc -ciphers`,
	);
}

const key = scryptSync(password, salt, secret_key_length);
const iv = randomFillSync(new Uint8Array(secret_iv_length));

export function encrypt(plain_text: string): string {
	const cipher = createCipheriv(encryption_method, key, iv);

	let encrypted = cipher.update(plain_text, 'utf8', 'hex');
	encrypted += cipher.final('hex');

	console.log(`encrypted string: ${encrypted}`);

	return encrypted;
}

export function decrypt(encrypted: string): string {
	const decipher = createDecipheriv(encryption_method, key, iv);

	let decrypted = decipher.update(encrypted, 'hex', 'utf8');
	decrypted += decipher.final('utf8');
	console.log(`decrypted string: ${decrypted}`);

	return decrypted;
}
