import { MdDelete } from "react-icons/md";
import { MdDoneOutline } from "react-icons/md";
import { MdUndo } from "react-icons/md";
import { MdExposurePlus1 } from "react-icons/md";
import { MdExposureNeg1 } from "react-icons/md";

const List = ({ data, onDelete, onStateChange, onChangeCount }) => {
    return (
        <div className='list'>
            {data.map((item, id) => {
                return (
                    <div className='list-item'>
                        <div className='content'
                            style={{
                                textDecoration: item.state === 'completed' ? 'line-through' : ''
                            }}
                        >
                            <p key={id}>{item.content} - {item.count}x</p>
                        </div>
                        <div className='actions'>

                            <button onClick={() => onChangeCount(item.id, item.count, 1)}>{<MdExposurePlus1 />}</button>
                            <button onClick={() => onChangeCount(item.id, item.count, -1)}>{<MdExposureNeg1 />}</button>

                            <button id='deleteBtn' onClick={() => onDelete(item.id)}>
                                {<MdDelete />}
                            </button>
                            {item.state === 'active' ?
                                <button
                                    id='completeBtn'
                                    onClick={() => onStateChange(item.id, item.state)}
                                >
                                    {<MdDoneOutline />}
                                </button>
                                :
                                <button
                                    id='resumeBtn'
                                    onClick={() => onStateChange(item.id, item.state)}
                                >
                                    {<MdUndo />}
                                </button>
                            }



                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default List
