export abstract class Adapter<T> {
    abstract find(): Promise<T[]>
}