export function getCalculationsFrom(value) {
  const netSalary = getNetSalaryFrom(value).toFixed(2);
  const baseInss = value.toFixed(2);
  const discountInss = getDiscountInssFrom(value);
  const baseIrpf = (value - getCalculateInssFrom(value)).toFixed(2);
  const discountIrpf = getDiscountIrpfFrom(value);

  return { netSalary, baseInss, discountInss, baseIrpf, discountIrpf };
}

function getDiscountInssFrom(value) {
  const inss = getCalculateInssFrom(value).toFixed(2);
  const percentage = ((inss * 100) / value).toFixed(2);

  return `${inss} - ${percentage}%`;
}

function getDiscountIrpfFrom(value) {
  const irpf = getCalculateIrpfFrom(value).toFixed(2);
  const percentage = ((irpf * 100) / value).toFixed(2);

  return `${irpf} - ${percentage}%`;
}

function getNetSalaryFrom(value) {
  const newNetSalary =
    value - getCalculateInssFrom(value) - getCalculateIrpfFrom(value);

  return newNetSalary;
}

function getCalculateInssFrom(value) {
  const newBaseInss = value;

  const roofBaseOne = 1045;
  const roofBaseTwo = 2089.6;
  const roofBaseThree = 3134.4;

  if (newBaseInss <= 1045) {
    const discountTrackOne = newBaseInss * (7.5 / 100);
    const inss = discountTrackOne;

    return inss;
  }

  if (newBaseInss <= 2089.6) {
    const discountTrackOne = roofBaseOne * (7.5 / 100);
    const discountTrackTwo = (newBaseInss - roofBaseOne) * (9 / 100);

    const inss = discountTrackOne + discountTrackTwo;

    return inss;
  }

  if (newBaseInss <= 3134.4) {
    const discountTrackOne = roofBaseOne * (7.5 / 100);
    const discountTrackTwo = (roofBaseTwo - roofBaseOne) * (9 / 100);
    const discountTrackThree = (newBaseInss - roofBaseTwo) * (12 / 100);

    const inss = discountTrackOne + discountTrackTwo + discountTrackThree;

    return inss;
  }

  if (newBaseInss <= 6101.06) {
    const discountTrackOne = roofBaseOne * (7.5 / 100);
    const discountTrackTwo = (roofBaseTwo - roofBaseOne) * (9 / 100);
    const discountTrackThree = (roofBaseThree - roofBaseTwo) * (12 / 100);
    const discountTrackFour = (newBaseInss - roofBaseThree) * (14 / 100);

    const inss =
      discountTrackOne +
      discountTrackTwo +
      discountTrackThree +
      discountTrackFour;

    return inss;
  }

  if (newBaseInss > 6101.06) {
    const roofInss = 6101.06;
    const discountTrackOne = roofBaseOne * (7.5 / 100);
    const discountTrackTwo = (roofBaseTwo - roofBaseOne) * (9 / 100);
    const discountTrackThree = (roofBaseThree - roofBaseTwo) * (12 / 100);
    const discountTrackFour = (roofInss - roofBaseThree) * (14 / 100);

    const inss =
      discountTrackOne +
      discountTrackTwo +
      discountTrackThree +
      discountTrackFour;

    return inss;
  }
}

function getCalculateIrpfFrom(value) {
  const newBaseIrpf = value - getCalculateInssFrom(value);

  if (newBaseIrpf <= 1903.98) {
    const irpf = 0;

    return irpf;
  }

  if (newBaseIrpf <= 2826.65) {
    const discount = newBaseIrpf * (7.5 / 100);
    const irpf = discount - 142.8;

    return irpf;
  }

  if (newBaseIrpf <= 3751.05) {
    const discount = newBaseIrpf * (15 / 100);
    const irpf = discount - 354.8;

    return irpf;
  }

  if (newBaseIrpf <= 4664.68) {
    const discount = newBaseIrpf * (22.5 / 100);
    const irpf = discount - 636.13;

    return irpf;
  }

  if (newBaseIrpf > 4664.68) {
    const discount = newBaseIrpf * (27.5 / 100);
    const irpf = discount - 869.36;

    return irpf;
  }

  return 0;
}
