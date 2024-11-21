import React, { FC, useState, ReactElement, useEffect} from "react";
import './WeaponsCard.css';
import { WeaponsCardWraps, BtnCRUD  } from "./WeaponsCard.styled";
import CardLoaded from "./CardLoaded";
import CardNew from "./CardNew";

export interface IWeaponsCardDto {
    model: string,
    name: string, 
    isVisible: boolean,
    price: number,
    weight: number, 
    description: string,
    image_path: string
}

interface ICard {
    card: IWeaponsCardDto | null
}

const Card: FC<ICard> = (props) => {

    const [cardDisplayed, setCardDisplayed] = useState<ReactElement<HTMLElement> | null>(null);
    const [isCardNew, setIsCardNew] = useState<boolean>(false);

    const handleIsCardNew = () => {
        setIsCardNew(!isCardNew);
    };

    useEffect(() => {
        if(!isCardNew){
            setCardDisplayed(<CardLoaded card={props.card}/>);
        }
        else{
            setCardDisplayed(<CardNew _handleIsCardNew={handleIsCardNew}/>);
        }
    }, [isCardNew, props.card?.model]);

    return (
        <WeaponsCardWraps>
            <div className="profile-card">
                {cardDisplayed}
                <div className="actions">
                    <button className="edit-btn" onClick={handleIsCardNew}>{!isCardNew ? 'New' : 'Back'}</button>           
                </div>
            </div>
        </WeaponsCardWraps>
    );
}

export default Card;