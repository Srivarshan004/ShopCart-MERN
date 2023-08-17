

function ProductReview({reviews}) {
    return (
        <div className="reviews w-100">
            <h3>Other's Reviews:</h3>
            <hr />
            {reviews && reviews.map(review => (
                <div key={review._id} className="review-card my-3">
                <div className="rating-outer">
                    <div className="rating-inner" style={{width : `${review.rating/5*100}%`}}></div>
                </div>
                <p className="review_user">by <b>{review.user.name}</b></p>
                <p className="review_comment"><b>{review.comment}</b></p>

                <hr />
            </div>
            ))}
        </div>
    )
}

export default ProductReview;