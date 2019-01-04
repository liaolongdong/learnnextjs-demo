import Layout from '../components/Layout'
import fetch from 'isomorphic-unfetch'

// export default (props) => (
//     <Layout>
//        <h1>{props.url.query.title}</h1>
//        <p>This is the blog post content.</p>
//     </Layout>
// )

const Post = (props) => (
	<Layout>
		<h1>{props.show.name}</h1>
		<p>{props.show.summary.replace(/<[/]?p>/g, '')}</p>
		<img src={props.show.image.medium}/>
	</Layout>
)

Post.getInitialProps = async function(context) {
	console.log(`context: ${context}`);
	const {id} = context.query
	const res = await fetch(`https://api.tvmaze.com/shows/${id}`)
	const show = await res.json()

	console.log(`Fetch show: ${show.name}`)

	return {show}
}

export default Post
