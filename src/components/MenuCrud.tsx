
type MenuCrudProps = {
    onClick: () => void;
}

function MenuCrud({ onClick }: MenuCrudProps) {
    return (
        <div className="btn-group" role="group" aria-label="Basic example">
            <button onClick={onClick} type="button" className="btn btn-primary">Crear Usuario</button>
            <button type="button" className="btn btn-primary">Consultar usuarios</button>
            <button type="button" className="btn btn-primary">Modificar datos de usuario</button>
            <button type="button" className="btn btn-primary">Eliminar Usuario</button>
        </div>
    )
}

export default MenuCrud