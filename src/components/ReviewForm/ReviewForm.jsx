import React, { useState } from 'react'
import { createReview } from '../../services/reviews'
import './ReviewForm.css'

const ReviewForm = ({ targetUserId, targetUsername, onReviewSubmitted, onClose }) => {
  const [rating, setRating] = useState(5)
  const [description, setDescription] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    

    setIsSubmitting(true)
    setError('')

    try {
      const reviewData = {
        target_user_id: targetUserId,
        rating,
        description: description.trim()
      }

      await createReview(reviewData)
      
      // Reset form
      setRating(5)
      setDescription('')
      
      // Notify parent component
      if (onReviewSubmitted) {
        onReviewSubmitted()
      }
      
      // Close form
      if (onClose) {
        onClose()
      }
      
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit review')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    if (onClose) {
      onClose()
    }
  }

  return (
    <div className="review-form-overlay">
      <div className="review-form-modal">
        <div className="review-form-header">
          <h3>Write a Review for {targetUsername}</h3>
          <button className="close-btn" onClick={handleCancel}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="review-form">
          <div className="rating-section">
            <label>Rating:</label>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={`star ${star <= rating ? 'filled' : 'empty'}`}
                  onClick={() => setRating(star)}
                >
                  ★
                </button>
              ))}
            </div>
            <span className="rating-text">{rating} out of 5 stars</span>
          </div>
          
          <div className="description-section">
            <label htmlFor="description">Review:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Share your experience with this user..."
              rows="4"
              required
            />
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-actions">
            <button 
              type="button" 
              className="cancel-btn" 
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="submit-btn" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ReviewForm
