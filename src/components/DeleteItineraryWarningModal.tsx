export default function DeleteItineraryWarningModal({
  onClose,
  onDelete,
}: {
  onClose: () => void
  onDelete: () => void
}) {
  return (
    <div className="modal">
      <div>Are you sure you want to delete this itinerary?</div>
      <button onClick={onClose}>Close</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  )
}
