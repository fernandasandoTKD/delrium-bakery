import { useState } from 'react';

const BuyerForm = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [buyerInfo, setBuyerInfo] = useState({
        name: 'John Doe',
        phone: '123-456-7890',
        address: '123 Main St, City, Country',
        email: 'john@example.com'
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBuyerInfo(prevInfo => ({ ...prevInfo, [name]: value }));
    };

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    return (
        <div className='col'>
            <h5>Información del Comprador</h5>
            <button className="btn btn-primary mb-3" onClick={toggleEdit}>
                {isEditing ? 'Guardar' : 'Editar'}
            </button>

            <form>
                <div className="mb-3">
                    <label className="form-label">Nombre:</label>
                    {isEditing ? (
                        <input type="text" className="form-control" name="name" value={buyerInfo.name} onChange={handleInputChange} />
                    ) : (
                        <p>{buyerInfo.name}</p>
                    )}
                </div>
                <div className="mb-3">
                    <label className="form-label">Teléfono:</label>
                    {isEditing ? (
                        <input type="tel" className="form-control" name="phone" value={buyerInfo.phone} onChange={handleInputChange} />
                    ) : (
                        <p>{buyerInfo.phone}</p>
                    )}
                </div>
                <div className="mb-3">
                    <label className="form-label">Dirección:</label>
                    {isEditing ? (
                        <input type="text" className="form-control" name="address" value={buyerInfo.address} onChange={handleInputChange} />
                    ) : (
                        <p>{buyerInfo.address}</p>
                    )}
                </div>
                <div className="mb-3">
                    <label className="form-label">Correo Electrónico:</label>
                    {isEditing ? (
                        <input type="email" className="form-control" name="email" value={buyerInfo.email} onChange={handleInputChange} />
                    ) : (
                        <p>{buyerInfo.email}</p>
                    )}
                </div>
            </form>
        </div>
    );
};

export default BuyerForm;