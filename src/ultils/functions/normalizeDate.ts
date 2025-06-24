import dayjs from "dayjs";

/**
 * Chuyển đổi một giá trị ngày bất kỳ sang đối tượng dayjs hoặc undefined
 * @param value - Giá trị đầu vào: string | Date | undefined | null
 * @returns dayjs object hoặc undefined
 */
export const normalizeDate = (value?: string | Date | null) => {
  const parsed = value ? dayjs(value) : undefined;
  return parsed && parsed.isValid() ? parsed : undefined;
};
