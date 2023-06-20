import { Oval } from "react-loader-spinner";

interface Props {
    size?: number;
}

function Spinner({ size }: Props) {
    return (
        <Oval
            height={size}
            width={size}
            color="var(--color-primary)"
            visible={true}
            ariaLabel="loading"
            secondaryColor="var(--color-text)"
            strokeWidth={5}
            strokeWidthSecondary={5}
        />
    );
}

export default Spinner;
