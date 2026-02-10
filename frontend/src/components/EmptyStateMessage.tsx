type EmptyStateMessageProps = {
  message?: string;
};

function EmptyStateMessage({ message }: EmptyStateMessageProps) {
  return (
    <tr>
      <td colSpan={3} className="p-4 text-center text-gray-500 italic">
        {/* No donations available yet. Add one to get started! */}
        {message}
      </td>
    </tr>
  );
}

export default EmptyStateMessage;
