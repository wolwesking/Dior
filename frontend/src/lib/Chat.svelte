<script>
    // Placeholder for chat functionality
</script>

<div class="w-full mt-6 bg-gray-100 border border-gray-200 rounded-lg overflow-hidden">
    <!-- Chat Messages -->
    <div class="h-[300px] overflow-auto">
        <div class="p-4 space-y-4">
            <div class="flex items-start gap-3">
                <div class="rounded-full bg-blue-500 text-white w-8 h-8 flex items-center justify-center">JD</div>
                <div>
                    <div class="font-medium">John Doe</div>
                    <div>Hey, how's it going?</div>
                </div>
            </div>
            <div class="flex items-start gap-3">
                <div class="rounded-full bg-green-500 text-white w-8 h-8 flex items-center justify-center">JS</div>
                <div>
                    <div class="font-medium">Jane Smith</div>
                    <div>Pretty good, thanks for asking!</div>
                </div>
            </div>
            <div class="flex items-start gap-3">
                <div class="rounded-full bg-yellow-500 text-white w-8 h-8 flex items-center justify-center">JD</div>
                <div>
                    <div class="font-medium">John Doe</div>
                    <div>Awesome, let's catch up later.</div>
                </div>
            </div>
        </div>
    </div>
    <!-- Message Input -->
    <div class="flex items-center p-4 bg-white border-t border-gray-200">
        <input
            type="text"
            class="flex-1 h-10 px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Type your message..."
        />
        <button class="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Send
        </button>
    </div>
</div>
