describe("CommentModal", () => {
    it('should fetch comments when mounted', (done) => {
        const comments = [
          { id: 1, comment_text: 'First comment', timestamp: '2024-04-20T10:00:00Z' },
          { id: 2, comment_text: 'Second comment', timestamp: '2024-04-20T11:00:00Z' },
        ];
    
        jasmine.Ajax.stubRequest('http://localhost:8086/api/v1/post/comments/1').andReturn({
          status: 200,
          contentType: 'application/json',
          responseText: JSON.stringify(comments),
        });
    
        commentModal.fetchComments();
    
        setTimeout(() => {
          expect(commentModal.comments.length).toBe(2);
          expect(commentModal.comments[0].comment_text).toBe('First comment');
          expect(commentModal.comments[1].comment_text).toBe('Second comment');
          done();
        });
        
      });
    
})