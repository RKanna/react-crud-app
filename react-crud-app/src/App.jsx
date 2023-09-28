import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { IoIosAddCircle } from "react-icons/Io";
import { v4 as uuidv4, v5 as uuidv5 } from "uuid";
import toast, { Toaster } from "react-hot-toast";
import { BsTrash3Fill } from "react-icons/Bs";
import { FaEdit } from "react-icons/Fa";
function App() {
  const [list, setList] = useState([]);
  // const [list, setList] = useState([{ id: 1, title: "hello" }]);
  const [title, setTitle] = useState("");
  const [quantity, setQuantity] = useState();

  const [isEditing, setIsEditing] = useState(false);
  const [itemToEdit, setItemToEdit] = useState({});
  // const errorNotify = () => toast.error("Error");
  const clickHandler = () => {
    if (title && quantity) {
      if (isEditing) {
        const updatedItems = list.map((item) => {
          if (item.id === itemToEdit.id) {
            const updatedItem = { ...item, title, quantity };
            return updatedItem;
          } else {
            return item;
          }
        });
        setList(updatedItems);
        setTitle("");
        setQuantity("");
        setIsEditing(false);
        setItemToEdit({});
        toast.success("Item Updated Successfully", { duration: 3000 });
      } else {
        const newItem = {
          id: uuidv4(),
          title,
          quantity,
        };
        setList([...list, newItem]);
        toast.success("Item Added Successfully", { duration: 3000 });
        setTitle("");
        setQuantity("");
      }
    } else {
      //if there is no title entered and clickHandler function activates(that is user clicks add button without title) then below function will execute
      toast.error("Title is Required", { duration: 3000 });
    }
  };

  const deleteItem = (id) => {
    const remainingItem = list.filter((item) => item.id !== id);
    setList(remainingItem);
    toast.error("Item Deleted");
  };

  const updateItem = (id) => {
    setIsEditing(true);
    // setItemToEdit(list.find((item) => item.id === id));
    const itemToUpdate = list.find((item) => item.id === id);
    setTitle(itemToEdit.title);
    setQuantity(itemToEdit.quantity);
    setItemToEdit(itemToUpdate);
    setTitle(itemToUpdate.title || "");
    setQuantity(itemToUpdate.quantity || "");
  };
  return (
    <>
      <Toaster />
      <main className="flex flex-col h-screen w-screen justify-center items-center">
        <section className="flex flex-col gap-4">
          <div className="forOutline w-[25rem] bg-bgclr rounded h-[10rem] flex flex-col justify-center items-center shadow-lg w-full">
            <h1 className="font-bold text-2xl">Test React Crud App</h1>
            <br />
            <div className="flex flex-row justify-between gap-8">
              <label htmlFor="title" className="font-bold p-2">
                Title
              </label>
              <input
                type="text"
                id="title"
                className="p-2 rounded"
                value={title}
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
              />

              <input
                type="number"
                id="quantity"
                className="p-2 rounded w-[5rem]"
                value={quantity}
                placeholder="Quantity"
                onChange={(e) => setQuantity(e.target.value)}
              />
              {/* <IoIosAddCircle
                className="text-2xl text-amber-950 cursor-pointer m-2"
                onClick={clickHandler}
              /> */}
              {isEditing ? (
                <FaEdit
                  className="text-2xl text-amber-950 cursor-pointer m-2"
                  onClick={clickHandler}
                />
              ) : (
                <IoIosAddCircle
                  className="text-2xl text-amber-950 cursor-pointer m-2"
                  onClick={clickHandler}
                />
              )}
            </div>
          </div>
          <div className="foroutlineAnother flex flex-row w-[25rem] w-full bg-white h-auto rounded shadow-lg items-center justify-center p-2">
            <ul className="w-full">
              {/* <li className="text-2xl font-bold">one</li> */}
              {list.length ? (
                list.map((item) => (
                  <li
                    className="text-2xl font-bold flex flex-row w-full justify-between items-center"
                    key={item.id}
                  >
                    <span className="w-[5rem]">{item.title}</span>
                    <span className="w-[5rem]">{item.quantity}</span>
                    <FaEdit
                      className="cursor-pointer"
                      onClick={() => updateItem(item.id)}
                    />
                    <BsTrash3Fill
                      className="cursor-pointer"
                      onClick={() => deleteItem(item.id)}
                    />
                  </li>
                )) //implicit (don't do this explicitly)
              ) : (
                <h2 className="text-center">No Item Exists</h2>
              )}
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
