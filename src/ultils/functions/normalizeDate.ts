import dayjs from "dayjs";

/**
 * Chuyển đổi một giá trị ngày bất kỳ sang đối tượng dayjs hoặc undefined
 * @param value - Giá trị đầu vào: string | Date | undefined | null
 * @returns dayjs object hoặc undefined
 */
export const normalizeDate = (value?: string | Date | null) => {
  return value ? dayjs(value) : undefined;
};
