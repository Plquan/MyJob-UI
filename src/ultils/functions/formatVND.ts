export const formatVND = (value?: number | string) => {
  if (value === null || value === undefined || value === "") {
    return undefined;
  }

  const number = Number(value);
  if (isNaN(number)) {
    return undefined;
  }

  return `${number.toLocaleString("vi-VN")} VNĐ`;
};
