const API_BASE = '/api/sessions/';

export const SessionManager = {
  // Save a new session or update existing
  saveSession: async (sessionId, firstQuery, chatHistory = []) => {
    const sessionData = {
      id: sessionId,
      title: firstQuery?.slice(0, 50) || 'Untitled Chat',
      firstQuery: firstQuery,
      messageCount: chatHistory.length,
    };

    const response = await fetch(`${API_BASE}${sessionId}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sessionData),
    });

    if (!response.ok) {
      throw new Error('Failed to save session');
    }

    return await response.json();
  },

  // Get all sessions
  getSessions: async () => {
    const response = await fetch(API_BASE);
    if (!response.ok) {
      throw new Error('Failed to fetch sessions');
    }
    return await response.json();
  },

  // Get session by ID
  getSession: async (sessionId) => {
    const response = await fetch(`${API_BASE}${sessionId}/`);
    if (!response.ok) {
      throw new Error('Session not found');
    }
    return await response.json();
  },

  // Delete a session
  deleteSession: async (sessionId) => {
    const response = await fetch(`${API_BASE}${sessionId}/`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete session');
    }
    return true;
  },

  // Update session title
  updateSessionTitle: async (sessionId, newTitle) => {
    const response = await fetch(`${API_BASE}${sessionId}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: newTitle }),
    });

    if (!response.ok) {
      throw new Error('Failed to update session title');
    }

    return await response.json();
  }
};
