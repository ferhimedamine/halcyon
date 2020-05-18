/// <reference types="react-scripts" />

declare module 'reactstrap-confirm' {
    interface ReactstrapConfirmConfig {
        title: string;
        message: string | JSX.Element;
        cancelColor?: string;
    }

    export default function confirm(
        config: IReactstrapConfirmConfig
    ): Promise<boolean>;
}
