export interface Libro {
    id: number;
    title: string;
    author_name?: string[];
    cover_i?: number;
    key: string;
    precio?: number;
    disponible?: "disponible"|"no disponible";
}