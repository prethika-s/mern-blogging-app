import { ICommand, ExecuteState, TextAreaTextApi } from './';
export declare function titleExecute({ state, api, prefix, suffix, }: {
    state: ExecuteState;
    api: TextAreaTextApi;
    prefix: string;
    suffix?: string;
}): void;
export declare const title: ICommand;
