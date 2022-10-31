export type Props = {
    disabled?: boolean,
    form?: string,
    id?: string,
    name: string,
    required?: boolean,
    value?: string | number,
    label: string,
    isInitialChecked?: boolean,
    onChange?: () => void;
};
