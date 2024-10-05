export type Nullable<T> = T | null
export type Undefinedable<T> = T | undefined

export type OnlyChildrenProps = {
    children: JSX.Element | JSX.Element[] | boolean | null | undefined
}
