let iotaCounter = 0;

export default function iota({reset, offset = 1}) {
	if(reset) iotaCounter = 0;
	iotaCounter += offset;
	return iotaCounter - offset;
}
