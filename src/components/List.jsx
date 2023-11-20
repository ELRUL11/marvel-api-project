import ListItem from './ListItem';

function List(props) {
  return (
      <div className="comic-wrapper">
          {props.comics && props.comics.map(comic => {
            return (
          <ListItem
            key={comic.id}
            comic={comic} 
            listType={props.listType}
            onSelect={props.onSelect} 
            onClick={props.onClick}
          />
          );
        })}
      </div>
  );
}

export default List;