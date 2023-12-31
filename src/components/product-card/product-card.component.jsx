import Button , {BUTTON_TYPE_CLASSES} from '../button/button.component';
import {ProductCartContainer, Footer, Name, Price} from './product-card.styles.jsx';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';


const ProductCard = ({product}) => {
    const {name, imageUrl,  price} = product;
    const { addItemToCart } = useContext(CartContext);

    const addProductToCart = ()=> {
        addItemToCart(product);
    }
    return (
        <ProductCartContainer>
            <img src={imageUrl} alt={`${name}`}/>
            <Footer>
                < Name> {name} </Name>
                <Price> {price} </Price>
                <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart} > Add to Cart</Button>
            </Footer>
        </ProductCartContainer>
    )
}

export default ProductCard;