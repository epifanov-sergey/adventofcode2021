import * as utils from '../utils';

((path: string, data = utils.readFile(path)) => {
  const arrData: Record<string, string[]>[] = data.split(utils.LINE_BREAK).map((line: string) => {
    const [signal, output] = line.split(' | ');
    return {
      signal: signal.split(' ').map(str => str.split('').sort().join('')),
      output: output.split(' ').map(str => str.split('').sort().join('')),
    };
  });

  const explode = (str1: string, str2: string) => {
    let res = str1;
    str2.split('').forEach(s => {
      res = res.replace(s, '');
    });
    return res;
  };

  const implode = (str1: string, str2: string) =>
    [...new Set([...str1.split(''), ...str2.split('')].sort())].join('');

  const decoder = (input: string[]): string[] => {
    const decoded = [];
    const inputByLength: Record<string, string[]> = {};
    input.forEach(str => {
      if (inputByLength[str.length] === undefined) {
        inputByLength[str.length] = [];
      }
      inputByLength[str.length].push(str);
    });
    const twoLengthStr = inputByLength[2][0];
    const threeLengthStr = inputByLength[3][0];
    const fourLengthStr = inputByLength[4][0];
    const arSixLengthStr = inputByLength[6];
    const arFiveLengthStr = inputByLength[5];
    const sevenLengthStr = inputByLength[7][0];
    // step one
    decoded[0] = explode(threeLengthStr, twoLengthStr);
    // step two
    const fourLengthPlusFirstSegment = implode(fourLengthStr, decoded[0]);
    decoded[6] = explode(
      arSixLengthStr.filter(s => explode(s, fourLengthPlusFirstSegment).length === 1)[0],
      fourLengthPlusFirstSegment
    );
    // step three
    const twoLengthPlusFirstAndLastSegments = implode(twoLengthStr, `${decoded[0]}${decoded[6]}`);
    decoded[3] = explode(
      arFiveLengthStr.filter(s => explode(s, twoLengthPlusFirstAndLastSegments).length === 1)[0],
      twoLengthPlusFirstAndLastSegments
    );
    // step four
    const twoLengthPlusFirstAndFourthAndLastSegments = implode(
      twoLengthStr,
      `${decoded[0]}${decoded[3]}${decoded[6]}`
    );
    decoded[1] = explode(
      arSixLengthStr.filter(
        s => explode(s, twoLengthPlusFirstAndFourthAndLastSegments).length === 1
      )[0],
      twoLengthPlusFirstAndFourthAndLastSegments
    );
    // step five
    const firstAndSecondAndFourthAndLastSegments = `${decoded[0]}${decoded[1]}${decoded[3]}${decoded[6]}`;
    decoded[5] = explode(
      arFiveLengthStr.filter(
        s => explode(s, firstAndSecondAndFourthAndLastSegments).length === 1
      )[0],
      firstAndSecondAndFourthAndLastSegments
    );
    // step six
    decoded[2] = explode(twoLengthStr, decoded[5]);
    // step seven
    decoded[4] = explode(sevenLengthStr, decoded.filter(Boolean).join(''));
    return decoded;
  };

  const getDigitByFiveSegments =
    (segments: string[]) =>
    (str: string): string => {
      if (str.indexOf(segments[2]) === -1) {
        return '5';
      }
      if (str.indexOf(segments[5]) === -1) {
        return '2';
      }
      return '3';
    };

  const getDigitBySixSegments = (segments: string[]) => (str: string) => {
    if (str.indexOf(segments[3]) === -1) {
      return '0';
    }
    if (str.indexOf(segments[2]) === -1) {
      return '6';
    }
    return '9';
  };

  const getSegmentsMatrix = (segments: string[]): Record<string, (_: string) => string> => {
    return {
      2: () => '1',
      3: () => '7',
      4: () => '4',
      5: getDigitByFiveSegments(segments),
      6: getDigitBySixSegments(segments),
      7: () => '8',
    };
  };

  const getDigit = (segments: string[], str: string): string =>
    getSegmentsMatrix(segments)[str.length](str);

  let result = 0;

  arrData.forEach(({ signal, output }) => {
    const segments = decoder(signal);
    result += Number(output.map(s => getDigit(segments, s)).join(''));
  });

  console.log('result', result);
})(process.argv[1]);
