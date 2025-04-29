export function getFirstLetter(completeName = '') {
	if (!completeName) {
		return '';
	}
	if (!completeName.includes(' ')) {
		return completeName[0];
	}
	const [primeiroNome, sobrenome] = completeName.split(' ');
	return primeiroNome[0] + sobrenome[0];
}
