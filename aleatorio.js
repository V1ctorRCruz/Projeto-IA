export function historiaAleatoria(perfil, historias) {
    const lista = historias[perfil];
    const indice = Math.floor(Math.random() * lista.length);
    return lista[indice];
}