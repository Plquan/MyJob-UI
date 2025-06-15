export function getLabelFromValue<T extends { value: any; label: string }>(
    options: T[],
    value: any
  ): string | undefined {
    return options.find((opt) => opt.value === value)?.label;
  }
  