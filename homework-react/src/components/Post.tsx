import React from 'react';

type PostProps = {
    id: number;
}

type PostArticle = {
    title: string;
    body: string;
    comments : JSX.Element[];
}

class Post extends React.Component<PostProps>{
    defaultURL: string;
    defaultPhotoURL : string;
    defaultCommentsURL : string;
    postArticle: PostArticle;

    constructor(props: PostProps) {
        super(props);
        this.state = {
            id: this.props.id
        }
        this.postArticle = {
            title: '',
            body: '',
            comments: []
        };
        this.defaultURL = 'https://jsonplaceholder.typicode.com/';
        this.defaultPhotoURL = 'https://picsum.photos/';
        this.defaultCommentsURL = 'https://jsonplaceholder.typicode.com/comments/'
    }

    fetchPosts = async (id: number) => {
        const response = await fetch(this.defaultURL + "posts/" + id);
        const data = await response.json();
        this.postArticle.title = data.title;
        this.postArticle.body = data.body;
        this.setState({ data });
    }

    fetchComments = async(id : number) => {
        const response = await fetch(this.defaultCommentsURL + id);
        const data = await response.json();
        for(let i = 0; i < data.body.length; i++) {
            this.postArticle.comments.push(
                <p>{data.body[i]}</p>
            );
        }
        this.setState({ data });
    }

    async componentDidMount() {
        await this.fetchPosts(this.props.id);
        this.fetchComments(this.props.id);
    }

    renderComments = () => {
        return this.postArticle.comments.map(
            (comment) => {
                return <p>{comment}</p>;
            }
        )
    }

    render() {
        return (
            <div className="article">
                <h2>
                    Title is : <br></br>{this.postArticle.title}
                </h2>
                <img src={this.defaultPhotoURL + this.props.id} alt=""></img>
                <h2>
                    Body is : <br></br> {this.postArticle.body}
                </h2>
            </div>
        )
    }
}

export default Post;